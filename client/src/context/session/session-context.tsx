import { createContext } from "react";

import { ISessionContext } from "./session-context.interface";

export const SessionContext = createContext<ISessionContext | undefined>(undefined);