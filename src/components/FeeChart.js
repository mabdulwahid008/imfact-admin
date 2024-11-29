import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { CgSoftwareDownload } from "react-icons/cg";
import { getUserGraphStats } from "../services/getUserGraphStats";
import { getFeeStats } from "../services/levels";

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const _data = {
    labels: ["MediaFee", "Payback", "ReviewFee", "DeliveryFee", "Action"], // Labels for the donut chart
    datasets: [
        {
            label: "",
            data: [0, 0, 0, 0, 0], 
            backgroundColor: ["#f96161", "#4c00a4", "#14212b", "#01CBC4", "#FFC542"],
            hoverOffset: 4, 
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true, 
            position: "bottom",
        },
    },
};

function FeeChart() {
    const [t] = useTranslation("global");
    const [granularity, setGranularity] = useState("yearly");
    const [data, setData] = useState(_data);

    useLayoutEffect(() => {
        const getStats = async () => {
            const response = await getFeeStats(granularity);
            if (response.status === 200) {
                const res = await response.json();
                setData((prev) => ({
                    ...prev,
                    datasets: [
                        {
                            ...prev.datasets[0],
                            data: [res.mediaFee, res.paybackAmount, res.reviewAmount, res.deliveryFee, res.actionAmount], // Update data
                        },
                    ],
                }));
            }
        };

        getStats();
    }, [granularity]);

    return (
        <div className="py-6 bg-white w-full rounded-lg">
            <div className="px-10 pl-5 flex justify-between items-center">
                <h2 className="text-themeBlack-300 text-lg font-bold mb-0">
                    {t("fee")}
                </h2>
                <div className="flex justify-between items-center gap-1">
                    <button
                        onClick={() => setGranularity("today")}
                        className={`${
                            granularity === "today" ? "bg-themeGrey-70" : ""
                        } hover:bg-themeGrey-70 transition-all ease-in duration-100 px-4 py-1.5 border-[1px] border-themeGrey-70 rounded-md text-themeBlack-900 text-xs font-semibold`}
                    >
                        {t("today")}
                    </button>
                    <button
                        onClick={() => setGranularity("monthly")}
                        className={`${
                            granularity === "monthly" ? "bg-themeGrey-70" : ""
                        } hover:bg-themeGrey-70 transition-all ease-in duration-100 px-4 py-1.5 border-[1px] border-themeGrey-70 rounded-md text-themeBlack-900 text-xs font-semibold`}
                    >
                        {t("month")}
                    </button>
                    <button
                        onClick={() => setGranularity("yearly")}
                        className={`${
                            granularity === "yearly" ? "bg-themeGrey-70" : ""
                        } hover:bg-themeGrey-70 transition-all ease-in duration-100 px-4 py-1.5 border-[1px] border-themeGrey-70 rounded-md text-themeBlack-900 text-xs font-semibold`}
                    >
                        {t("year")}
                    </button>
                </div>
            </div>
            <div className="px-10 pt-4">
                <div className="w-full h-[400px]">
                    <Doughnut data={data} options={options} />
                </div>
            </div>
        </div>
    );
}

export default FeeChart;

