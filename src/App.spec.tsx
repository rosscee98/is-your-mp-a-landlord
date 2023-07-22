import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// TODO: mock `fetchData()`

it("Submitting input renders input on screen", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  const input = screen.getByRole("textbox");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  fireEvent.change(input, { target: { value: "Hello world" } });
  fireEvent.click(submitButton);

  await waitFor(() =>
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  );
});
