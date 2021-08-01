import * as S from "./styled";
import { MdExpandMore } from "react-icons/md";
import { useAppSelector } from "../../hooks";

const Navbar = () => {
  const { user } = useAppSelector(({ authReducers }) => authReducers);
  return (
    <S.Nav>
      <S.Wrapper>
        <S.UserInfo>
          <h4>{user.name}</h4>
          <p>
            {user.role === "COMPANY" ? user.bank_account.acc_user_name : null}
          </p>
        </S.UserInfo>
        <S.UserBtn>
          <S.UserImage src={user.picture} alt={user.name} />
          <MdExpandMore />
        </S.UserBtn>
      </S.Wrapper>
    </S.Nav>
  );
};

export default Navbar;
