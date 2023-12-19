import React from "react";
import { Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_TRENDING_REPOSITORIES } from "./queries";

const TestComponent = () => {
  const { loading, error, data } = useQuery(GET_TRENDING_REPOSITORIES, {
    variables: { queryString: "language:JavaScript stars:>10000" },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.error("Error fetching data: ", error);
    return <Text>Error fetching data</Text>;
  }

  console.log(data); // Here you'll see the fetched data in your JavaScript console

  // Optionally, render items on screen to visually inspect them
  return (
    <View>
      {data.search.edges.map(({ node }) => (
        <View key={node.id}>
          <Text>{node.nameWithOwner}</Text>
          <Text>{node.description}</Text>
          {/* Render more data as needed */}
        </View>
      ))}
    </View>
  );
};

export default TestComponent;
