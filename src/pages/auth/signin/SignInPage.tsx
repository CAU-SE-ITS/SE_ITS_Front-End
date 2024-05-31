import { useForm } from "react-hook-form";

import { Container, SignInContainer, Logo } from "@/entities";
import { AuthService } from "@/shared";

import * as Styles from "../Styles";

const SignInPage = () => {
  const { register, handleSubmit } = useForm<User.SignInReqDto>({
    defaultValues: {
      signId: "",
      password: "",
    },
  });

  const { signin } = AuthService();

  const onSubmit = (data: User.SignInReqDto) => {
    signin(data);
  };

  return (
    <Container>
      <Logo type="BIG" />
      <SignInContainer>
        <Styles.SignInForm onSubmit={handleSubmit(onSubmit)}>
          <Styles.Input
            placeholder="아이디"
            {...register("signId", { required: "아이디를 입력해주세요!" })}
          />
          <Styles.Input
            placeholder="비밀번호"
            type="password"
            {...register("password", { required: "비밀번호를 입력해주세요!" })}
          />
          <Styles.StyleButton type="submit" variant="contained">
            로그인
          </Styles.StyleButton>
        </Styles.SignInForm>
      </SignInContainer>
    </Container>
  );
};

export default SignInPage;
