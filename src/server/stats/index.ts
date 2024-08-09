'use server'

export async function getStats(player_name: string) {
    const result = await fetch(`http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/name/${player_name}`);
    const data = await result.text()
    return data;

}