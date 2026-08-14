import neo4j, { Driver } from "neo4j-driver";

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

if (!uri || !username || !password) {
    console.log(uri + " " + username + " " + password);
    throw new Error("CognoDB environment variables are missing");
}

export const driver: Driver = neo4j.driver(
    uri,
    neo4j.auth.basic(username, password)
);

export const verifyDatabaseConnection = async (): Promise<void> => {
    try {
        await driver.verifyConnectivity();

        console.log("Connected to CognoDB successfully");

        const result = await driver.executeQuery(
            "RETURN 'GraphQuest is connected!' AS message"
        );
        console.log(result.records[0].get("message"));
    } catch (error) {
        console.error("Failed to connect to CognoDB:", error);

        throw error;
    }
};