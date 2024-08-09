'use client'
import React, { useEffect } from 'react'
import { Button } from './ui/button'

export interface PlayerStats {
    id: number;
    playerName: string;
    position: string;
    age: number;
    games: number;
    gamesStarted: number;
    minutesPg: number;
    fieldGoals: number;
    fieldAttempts: number;
    fieldPercent: number;
    threeFg: number;
    threeAttempts: number;
    threePercent: number;
    twoFg: number;
    twoAttempts: number;
    twoPercent: number;
    effectFgPercent: number;
    ft: number;
    ftAttempts: number;
    ftPercent: number;
    offensiveRb: number;
    defensiveRb: number;
    totalRb: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    personalFouls: number;
    points: number;
    team: string;
    season: number;
    playerId: string;
}

type Props = {
    jsonData: PlayerStats[]
}

function jsonToCsv(jsonData: PlayerStats[]): string {
    const array = typeof jsonData !== 'object' ? JSON.parse(jsonData as unknown as string) : jsonData;

    // Extract headers
    const headers = Object.keys(array[0]);
    const csvRows = [];

    // Add header row
    csvRows.push(headers.join(','));

    // Add rows for each object
    for (const item of array) {
        const values = headers.map(header => {
            const escapeVal = ('' + item[header as keyof PlayerStats]).replace(/"/g, '""');
            return `"${escapeVal}"`;
        });
        csvRows.push(values.join(','));
    }

    // Combine rows into a single string
    return csvRows.join('\n');
}

function downloadCsv(csvData: string, filename: string = 'data.csv'): void {
    // Create a Blob from the CSV string
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with a filename
    link.download = filename;

    // Create a URL for the Blob and set it as the href attribute
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the document body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}

export default function DownloadCsv({ jsonData }: Props) {

    const handleClick = () => {
        const csvData = jsonToCsv(jsonData);
        downloadCsv(csvData);
    };

    return (
        <Button onClick={handleClick}>
            Download CSV
        </Button>
    )
}