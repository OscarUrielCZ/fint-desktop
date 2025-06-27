export const DATE_PARAM_FORMAT = "YYYY-MM-DD";

/**
 * 
 * @param percentage a value from 0 to 1
 */
export const getLevelColor = (percentage) => {
    const levelColors = [
        {
            threshold: 0.7,
            color: "#8CB369",
        },
        {
            threshold: 0.9,
            color: "#F4E285",
        },
        {
            threshold: 1.2,
            color: "#F4A259",
        },
        {
            threshold: Infinity,
            color: "#C94F55",
        },
    ];

    return levelColors.find((color) => percentage <= color.threshold)?.color;    
};

