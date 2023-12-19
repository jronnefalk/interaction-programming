// RepositoryList.js
import React from "react";
import { useQuery } from "@apollo/client";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { GET_REPOSITORIES } from "./queries";

const RepositoryList = ({ navigation }) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error!</Text>;

  return (
    <FlatList
      data={data.repositories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { repoId: item.id })}
        >
          <Text>{item.name}</Text>
          {/* Display other repository details */}
        </TouchableOpacity>
      )}
    />
  );
};

export default RepositoryList;
