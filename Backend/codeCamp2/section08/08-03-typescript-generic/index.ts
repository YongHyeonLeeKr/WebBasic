// 1. primitive type
const getPrimitive = (arg1: string , arg2: number , arg3: boolean): [boolean, number, string] => {
    return [arg3, arg2, arg1]
}

const result = getPrimitive("노아", 123, false);


// 2. any type (almost same with javascript)
const getAny = (arg1 : any, arg2: any, arg3: any): [any, any, any] => {
    return [arg3, arg2, arg1]
}

const result2 = getAny(1,2,3);

// 3. unknown type more safer than any 
const getUnknown = (arg1 : unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
    if(typeof arg1 === "number") console.log(arg1 + 200)
    return [arg3, arg2, arg1]
}

const result3 =  getUnknown(3,2,1)

// 4. generic type ( customized my own type )

function getGeneric<Mytype1,Mytype2,Mytype3>(arg1 : Mytype1, arg2: Mytype2, arg3: Mytype3): [Mytype3, Mytype2, Mytype1] {
    if(typeof arg1 === "number") console.log(arg1 + 200)
    return [arg3, arg2, arg1]
}

const result4 =  getGeneric<string, number, boolean>("abc",2,false)

// 5. generic type2 ( customized my own type )

function getGeneric2<T1,T2,T3>(arg1 : T1, arg2: T2, arg3: T3): [T3, T2, T1] {
    if(typeof arg1 === "number") console.log(arg1 + 200)
    return [arg3, arg2, arg1]
}

const result5 =  getGeneric2<string, number, boolean>("abc",2,false)// 


// 6. arrow function with generic type2 ( customized my own type )

const getGeneric3 = <T1,T2,T3>(arg1 : T1, arg2: T2, arg3: T3): [T3, T2, T1] => {
    if(typeof arg1 === "number") console.log(arg1 + 200)
    return [arg3, arg2, arg1]
}

const result6 =  getGeneric2<string, number, boolean>("abc",2,false)