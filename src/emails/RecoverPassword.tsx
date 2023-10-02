import * as React from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Font } from "@react-email/font";
import { Button } from "@react-email/button";
import { Preview } from "@react-email/preview";
import { Heading } from "@react-email/heading";
import { Img } from "@react-email/img";
import { Section } from "@react-email/section";
import { Column } from "@react-email/column";
import { Row } from "@react-email/row";
import { Text } from "@react-email/text";
import { Container } from "@react-email/container";
import { Hr } from "@react-email/hr";
import { Body } from "@react-email/body";
import { Tailwind } from "@react-email/tailwind";

interface EmailProps {
  nameFound: string | undefined;
}

export default function RecoverPassword({ nameFound }: EmailProps) {
  return (
    <Html lang="es">
      <Preview>Confirm your email adress</Preview>
      <Body style={main}>
        <Container style={container}>
          <Container style={container}>
            <Img
              src="https://i.ibb.co/2Sh7Lt7/logoGood.png"
              alt="logoGood"
              width={300}
              height={130}
            />
          </Container>
          <Hr />
          <Heading style={h1} as="h2">
            Recuperar tu contraseña
          </Heading>
          <Heading style={h2}>
            Hola, {nameFound}! Tu seguridad para nosotros es de suma
            importancia, por tal razon abajo tienes un boton donde te redijira a
            la pagina oficial de omnimoode para restablecer tu contraseña
            exitosamente.{" "}
          </Heading>
          <Button pX={10} pY={10} href={"localhost:3000/changePassword"} style={button}>
            Restablecer mi contraseña
          </Button>

          <Section>
            <Text>
              Si este correo no tiene nada que ver contigo, por favor hacer caso
              omiso
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily: "'Roboto Mono', monospace",
};

const h1 = {
  fontSize: "30px",
};

const h2 = {
  fontSize: "20px",
  fontWeight: "200",
};

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginRight: "50px",
  marginBottom: "30px",
  padding: "43px 23px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const button = {
  backgroundColor: "black",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};
