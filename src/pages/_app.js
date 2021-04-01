import "@/styles/globals.css";
import { AuthProvider } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import Head from "next/head";
import { Container, CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
import theme from "@/styles/theme";
import { Router } from "next/router";
import NProgress from "nprogress";
import { SnackbarProvider } from "notistack";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Store</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        {/* Import CSS for nprogress */}
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <SnackbarProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Navigation />

            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Component {...pageProps} />
                </Grid>
              </Grid>
            </Container>
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
