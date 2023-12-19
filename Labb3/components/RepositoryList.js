import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_TRENDING_REPOSITORIES } from "./queries";
import LanguageSelector from "./LanguageSelector";

const RepositoryList = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const { loading, error, data } = useQuery(GET_TRENDING_REPOSITORIES, {
    variables: { queryString: `language:${selectedLanguage} stars:>10000` },
  });

  const renderItem = ({ item }) => {
    const repo = item.node;
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{repo.name}</Text>
        <Text>{repo.owner.login}</Text>
        <Text style={styles.description}>{repo.description}</Text>
        <View style={styles.stats}>
          <Text>Forks: {repo.forks?.totalCount ?? "N/A"}</Text>
          <Text>Stars: {repo.stargazers?.totalCount ?? "N/A"}</Text>
        </View>
      </View>
    );
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.search.edges}
        keyExtractor={(edge) => edge.node.id}
        renderItem={renderItem}
      />
      <View style={styles.languageSelector}>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#f0e1ec",
    borderRadius: 6,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginVertical: 8,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  languageSelector: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "white",
  },
});

export default RepositoryList;
