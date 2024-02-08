import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import EmpTable from "./pages/EmpTable";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import EmpSearchTable from "./pages/EmpSearch";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<EmpTable />} />
          <Route path="/search" element={<EmpSearchTable />} />
        </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
