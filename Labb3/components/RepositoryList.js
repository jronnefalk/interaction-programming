import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_TRENDING_REPOSITORIES } from "./queries";
import LanguageSelector from "./LanguageSelector";

const RepositoryList = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript"); // Default language
  const { loading, error, data } = useQuery(GET_TRENDING_REPOSITORIES, {
    variables: { queryString: `language:${selectedLanguage} stars:>10000` },
  });

  const renderItem = ({ item }) => {
    const repo = item.node;
    return (
      <View>
        <Text>{repo.name}</Text>
        <Text>{repo.owner?.login}</Text>
        <Text>{repo.description}</Text>
        <Text>Forks: {repo.forks?.totalCount ?? "N/A"}</Text>
        <Text>Stars: {repo.stargazers?.totalCount ?? "N/A"}</Text>
      </View>
    );
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={(newLanguage) => {
          setSelectedLanguage(newLanguage);
          // Optionally, you can refetch the query with the new language here
          // refetch({ queryString: `language:${newLanguage} stars:>10000` });
        }}
      />
      <FlatList
        data={data?.search.edges}
        keyExtractor={(edge) => edge.node.id}
        renderItem={renderItem} // Use the renderItem function here
      />
    </View>
  );
};

export default RepositoryList;
