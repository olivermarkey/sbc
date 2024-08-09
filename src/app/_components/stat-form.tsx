'use client'
import { useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getStats } from "@/server/stats";
import DownloadCsv, { PlayerStats } from "./download-csv";

const GetStatsSchema = z.object({
    player_name: z.string().min(1).max(100),
});



export default function StatForm() {
    const [isPending, startTransition] = useTransition();
    // const [formError, setFormError] = useState<string>("");
    const [stats, setStats] = useState<PlayerStats[]>([]);
    const form = useForm<z.infer<typeof GetStatsSchema>>({
        resolver: zodResolver(GetStatsSchema),
    });

    const onSubmit = async (formData: z.infer<typeof GetStatsSchema>) => {
        const data = await getStats(formData.player_name);
        setStats(data);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="player_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Player Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter player name"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit"
                        disabled={isPending}
                        className="mt-4"
                    >
                        Search
                    </Button>
                </form>
            </Form>
            {stats && (
                <>
                    <div className="my-4">
                        {!!stats && <DownloadCsv jsonData={stats} />}
                    </div>
                    <div className="mt-4 max-w-screen-sm">
                        <h2 className="text-xl font-bold mb-2">Player Stats</h2>
                        <div className="font-mono text-sm break-words">
                            {JSON.stringify(stats)}
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}