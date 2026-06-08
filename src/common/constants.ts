export const DATE_PARAM_FORMAT = "YYYY-MM-DD";

/**
 * Returns a gentle, lighter background color based on percentage
 * @param percentage a value from 0 to 1
 */
export const getLevelColor = (percentage: number) => {
    const levelColors = [
        {
            threshold: 0.7,
            color: "#c0f2d8", // Gentle Success Emerald
        },
        {
            threshold: 0.9,
            color: "#fcf1c3", // Gentle Warning Amber
        },
        {
            threshold: 1.1,
            color: "#f9decd", // Gentle Caution Orange
        },
        {
            threshold: Infinity,
            color: "#fad4d6", // Gentle Risk Rose
        },
    ];

    return levelColors.find((color) => percentage <= color.threshold)?.color;    
};

/**
 * Returns a strong, high-contrast text color based on percentage
 * @param percentage a value from 0 to 1
 */
export const getLevelTextColor = (percentage: number) => {
    const levelColors = [
        {
            threshold: 0.7,
            color: "#065F46", // Deep Emerald
        },
        {
            threshold: 0.9,
            color: "#92400E", // Deep Amber
        },
        {
            threshold: 1.1,
            color: "#9A3412", // Deep Orange
        },
        {
            threshold: Infinity,
            color: "#9F1239", // Deep Rose
        },
    ];

    return levelColors.find((color) => percentage <= color.threshold)?.color;    
};
