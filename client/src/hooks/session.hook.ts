import { useContext } from "react";

import { ISessionContext } from "@/context/session/session-context.interface";
import { SessionContext } from "@/context/session/session-context";

const useSession = () => {
  const sessionContext = useContext(SessionContext);

  return sessionContext as ISessionContext;
};

export default useSession;