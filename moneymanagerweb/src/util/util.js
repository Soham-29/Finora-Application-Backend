// utils/util.js

// ==============================
// Format number (1,000 / 1,25,000)
// ==============================
export const addThousandSeparator = (num) => {
    if (num === null || num === undefined || num === "") return "";

    const parsed = Number(num);
    if (isNaN(parsed)) return "";

    return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0
    }).format(parsed);
};


// ==============================
// Format currency (₹ 1,000)
// ==============================
export const formatCurrency = (num, currency = "INR") => {
    if (num === null || num === undefined || num === "") return "";

    const parsed = Number(num);
    if (isNaN(parsed)) return "";

    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0
    }).format(parsed);

    const symbols = {
        INR: "₹",
        USD: "$"
    };

    return `${symbols[currency] || "₹"} ${formatted}`;
};


// ==============================
// Prepare data for Line Chart
// ==============================
export const prepareLineChartData = (transactions = []) => {
    if (!Array.isArray(transactions)) return [];

    const groupedData = {};

    transactions.forEach((item) => {
        const dateKey = item.date; // YYYY-MM-DD

        if (!groupedData[dateKey]) {
            groupedData[dateKey] = {
                date: dateKey,
                totalAmount: 0,
                items: [],
                month: formatDateLabel(dateKey)
            };
        }

        groupedData[dateKey].items.push(item);
        groupedData[dateKey].totalAmount += Number(item.amount || 0);
    });

    // Convert to array + sort by date
    return Object.values(groupedData).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
};


// ==============================
// Helper: Format "6th Jul"
// ==============================
const formatDateLabel = (dateStr) => {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleString("en-IN", { month: "short" });

    return `${getOrdinal(day)} ${month}`;
};


// ==============================
// Helper: 1st, 2nd, 3rd, 4th...
// ==============================
const getOrdinal = (n) => {
    if (n > 3 && n < 21) return `${n}th`;

    switch (n % 10) {
        case 1: return `${n}st`;
        case 2: return `${n}nd`;
        case 3: return `${n}rd`;
        default: return `${n}th`;
    }
};