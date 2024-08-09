'use server'

import { PlayerStats } from "@/app/_components/download-csv";
import { GetStatsOptions } from "./types";

export async function getStats({ player_names }: GetStatsOptions) {
    let data: PlayerStats[] = [];
    for (let player_name of player_names) {
        console.log(player_name);
        const result = await fetch(`http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/name/${player_name}`);
        const playerData = await result.json()
        data.push(playerData);
    }
    console.log(data)
    return data;

   /*  const result = await fetch(`http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/name/${player_name}`);
    //const data = await result.json()
    // console.log(data)
    return data; */

}