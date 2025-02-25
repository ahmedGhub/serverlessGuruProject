const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Books";

exports.createBook = async (event) => {
    console.log("CreateBook event received:", event);
    try {
        const body = JSON.parse(event.body);
        const params = {
            TableName: TABLE_NAME,
            Item: body
        };
        await dynamoDB.send(new PutCommand(params));
        console.log("Book created successfully:", body);
        return { statusCode: 201, body: JSON.stringify({ message: "Book created" }) };
    } catch (error) {
        console.error("Error creating book:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Could not create book" }) };
    }
};

exports.getBook = async (event) => {
    console.log("GetBook event received:", event);
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: { id: event.pathParameters.id }
        };
        const { Item } = await dynamoDB.send(new GetCommand(params));
        if (!Item) {
            console.warn("Book not found:", event.pathParameters.id);
            return { statusCode: 404, body: JSON.stringify({ error: "Book not found" }) };
        }
        console.log("Book retrieved:", Item);
        return { statusCode: 200, body: JSON.stringify(Item) };
    } catch (error) {
        console.error("Error retrieving book:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Could not retrieve book" }) };
    }
};

exports.updateBook = async (event) => {
    console.log("UpdateBook event received:", event);
    try {
        const body = JSON.parse(event.body);
        const params = {
            TableName: TABLE_NAME,
            Key: { id: event.pathParameters.id },
            UpdateExpression: "set title = :title, author = :author, publishedYear = :publishedYear, genre = :genre",
            ExpressionAttributeValues: {
                ":title": body.title,
                ":author": body.author,
                ":publishedYear": body.publishedYear,
                ":genre": body.genre
            },
            ReturnValues: "ALL_NEW"
        };
        const { Attributes } = await dynamoDB.send(new UpdateCommand(params));
        console.log("Book updated successfully:", Attributes);
        return { statusCode: 200, body: JSON.stringify(Attributes) };
    } catch (error) {
        console.error("Error updating book:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Could not update book" }) };
    }
};

exports.deleteBook = async (event) => {
    console.log("DeleteBook event received:", event);
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: { id: event.pathParameters.id }
        };
        await dynamoDB.send(new DeleteCommand(params));
        console.log("Book deleted successfully:", event.pathParameters.id);
        return { statusCode: 200, body: JSON.stringify({ message: "Book deleted" }) };
    } catch (error) {
        console.error("Error deleting book:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Could not delete book" }) };
    }
};
