// RepositoryDetails.js
import React from "react";
import { useQuery } from "@apollo/client";
import { View, Text } from "react-native";
import { GET_REPOSITORY_DETAILS } from "./queries";

const RepositoryDetails = ({ route }) => {
  const { repoId } = route.params;
  const { data, loading, error } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { id: repoId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error!</Text>;

  return (
    <View>
      <Text>{data.repository.name}</Text>
      {/* Display other detailed information */}
    </View>
  );
};

export default RepositoryDetails;
