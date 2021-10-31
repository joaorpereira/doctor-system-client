import * as S from "./styled";
import { MdExpandMore } from "react-icons/md";
import { memo } from "react";
import { BUCKET_URL } from "../../utils";

type Props = {
  handleShowLogoutModal: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: Record<string, any>;
};

const Navbar: React.FC<Props> = ({ handleShowLogoutModal, user }: Props) => {
  return (
    <S.Nav>
      <S.Wrapper>
        <S.UserInfo>
          <h4>{user.name}</h4>
          <p>
            {user.role === "COMPANY" &&
            user.bank_account.acc_user_name !== user.name
              ? user.bank_account.acc_user_name
              : ""}
          </p>
        </S.UserInfo>
        <S.UserBtn onClick={handleShowLogoutModal}>
          <S.UserImage
            loading="lazy"
            src={`${BUCKET_URL}${user.picture}`}
            alt={user.name}
          />
          <MdExpandMore />
        </S.UserBtn>
      </S.Wrapper>
    </S.Nav>
  );
};

export default memo(Navbar);
