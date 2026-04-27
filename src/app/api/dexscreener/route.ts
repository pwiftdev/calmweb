import { NextResponse } from 'next/server';

const CONTRACT_ADDRESS = '3PCLR93WQaFA3wXbHqp2WoXZUqeiP4kNTbURwY3ppump';

export async function GET() {
  try {
    // Try the standard DexScreener API endpoint first
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 10 }, // Cache for 10 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`DexScreener API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Find the Solana pair (chainId can be 'solana', 'sol', or check pairAddress format)
    const solanaPair = data.pairs?.find((pair: any) => {
      const chainId = pair.chainId?.toLowerCase();
      return chainId === 'solana' || chainId === 'sol' || pair.pairAddress?.startsWith('solana');
    }) || data.pairs?.[0];

    if (!solanaPair || !data.pairs || data.pairs.length === 0) {
      return NextResponse.json({ 
        error: 'No Solana pair found',
        data: null 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        marketCap: solanaPair.marketCap ? parseFloat(solanaPair.marketCap) : null,
        volume: solanaPair.volume?.h24 ? parseFloat(solanaPair.volume.h24) : (solanaPair.volume ? parseFloat(solanaPair.volume) : null),
        priceUsd: solanaPair.priceUsd ? parseFloat(solanaPair.priceUsd) : null,
        priceChange24h: solanaPair.priceChange?.h24 ? parseFloat(solanaPair.priceChange.h24) : null,
        liquidity: solanaPair.liquidity ? parseFloat(solanaPair.liquidity) : null,
        fdv: solanaPair.fdv ? parseFloat(solanaPair.fdv) : null,
        pairAddress: solanaPair.pairAddress || null,
        dexId: solanaPair.dexId || null,
      }
    });
  } catch (error) {
    console.error('DexScreener API error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: null 
    }, { status: 500 });
  }
}

