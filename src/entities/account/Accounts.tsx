import { useEffect } from "react";

import { ScrollArea, Element, CreateAccount, EditAccount } from "@/entities";
import { AccountService, useAccountStore } from "@/shared";

export const Accounts = () => {
  const { loadAllAccountList } = AccountService();
  const accounts = useAccountStore((state) => state.accounts);

  useEffect(() => {
    //loadAllAccountList();
  }, []);

  return (
    <>
      <EditAccount user={{ id: 1, name: "강민규", role: "PL" }} />
      <ScrollArea title="계정 관리">
        {accounts.map((account) => (
          <Element key={account.id}>{account.name}</Element>
        ))}
      </ScrollArea>
    </>
  );
};
