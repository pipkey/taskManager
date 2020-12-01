import {StateType, userReducer} from "./User-reducer";

test("user reducer should increment only age", () => {
    const startState: StateType = {
        name: "Dimych",
        age: 20,
        childrenCount: 2
    };

    const endState = userReducer(startState, {type: "INCREMENT-AGE"});

    expect(endState.name).toBe("Dimych");
    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test("user reducer should increment only childrenCount", () => {
    const startState: StateType = {
        name: "Dimych",
        age: 20,
        childrenCount: 2
    };
    const action = {
        type: "INCREMENT-CHILDREN-COUNT"
    };


    const endState = userReducer(startState, action);

    expect(endState.name).toBe("Dimych");
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});

test("change name", () => {
    const startState: StateType = {
        name: "Dimych",
        age: 20,
        childrenCount: 2
    };
    const action = {
        type: "CHANGE-NAME",
        name: "Dmitriy"
    };

    const endState = userReducer(startState, action);

    expect(endState.name).toBe("Dmitriy");
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(2);
});

