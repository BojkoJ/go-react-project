package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var ProductCollection *mongo.Collection

func Connect() error {
	var err error
	Client, err = mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		return err
	}

	// Initialize collections
	ProductCollection = Client.Database("shop").Collection("products")
	
	return nil
}

func Disconnect() {
	if err := Client.Disconnect(context.Background()); err != nil {
		log.Printf("Error disconnecting from MongoDB: %v", err)
	}
}