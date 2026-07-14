import { Resend } from "resend";

const resend = new Resend("re_SSWm9JE1_AHUJx1xr4ijaF5C2vV926PRM");

async function test() {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "kylafrancesmontero@gmail.com",
    subject: "Test",
    html: "<p>Test</p>",
  });

  if (error) {
    console.error("ERROR:", error);
  } else {
    console.log("SUCCESS:", data);
  }
}

test();
