import { IUser } from "./interface";

export type a = boolean;

export type GroupUser = Omit<IUser, "groups">;
