import { findByUsername } from "../../../api/firebase/Budget";
import { Budget } from "../../../models/Budget.dto";

describe("find budget by username", () => {
    test("should return the right budget", async () => {
        const username = "osqur";
        findByUsername(username).then((budget: Budget) => {
            expect(budget.username).toBe(username);
        });
    });
});