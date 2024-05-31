import { useEffect, useState } from "react";

import { ScrollArea, Element, CreateAccount, EditAccount } from "@/entities";
import { AccountService, useAccountStore } from "@/shared";

export const Accounts = () => {
  const { loadAllAccountList } = AccountService();
  const [onEdit, setOnEdit] = useState<false | User.User>(false);
  const [onCreate, setOnCreate] = useState(false);
  const accounts = useAccountStore((state) => state.accounts);

  useEffect(() => {
    loadAllAccountList();
  }, []);

  return (
    <>
      {onEdit && (
        <EditAccount
          user={onEdit}
          onClose={() => {
            setOnEdit(false);
          }}
        />
      )}
      {onCreate && (
        <CreateAccount
          onClose={() => {
            setOnCreate(false);
          }}
        />
      )}
      <ScrollArea
        title="사용자"
        createClick={() => {
          setOnCreate(true);
        }}
      >
        {accounts.map((account) => (
          <Element
            key={account.id}
            onClick={() => {
              setOnEdit(account);
            }}
          >
            {`${account.name} [${account.role}] [${account.id}] `}
          </Element>
        ))}
      </ScrollArea>
    </>
  );
};
