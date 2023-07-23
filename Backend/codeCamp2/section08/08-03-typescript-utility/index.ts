interface IProfile {
    name: string;
    age: number;
    school: string;
    hobby?: string;
}

type partialType = Partial<IProfile>;

type requiredType = Required<IProfile>;

type pickType = Pick<IProfile, "name" | "age"> 

type omitType = Omit<IProfile, "school" | "hobby"> 

type unionType = "name" | "age" | "school"
type recordType = Record<unionType, string >

