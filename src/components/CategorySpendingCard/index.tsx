import { CategorySpending } from "../../common/types";

function CategorySpendingCard({ category }: { category: CategorySpending }) {
    return (
        <div style={{ backgroundColor: "#ddd", padding: 5 }}>
            <p>{ category.category }</p>
            <p>${ category.speding } MXN</p>
        </div>
    );
}

export default CategorySpendingCard;