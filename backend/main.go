package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client
var collection *mongo.Collection

// Struktura pro variantu produktu
type Variant struct {
	Size  string  `json:"size"`
	Price float64 `json:"price"`
	Stock int     `json:"stock"`
}

// Struktura pro kategorii
type Category struct {
	Name string `json:"name"`
}

type Product struct {
	ID          string    `json:"id,omitempty" bson:"_id,omitempty"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Category    Category  `json:"category"`
	Variants    []Variant `json:"variants"`
}

func main() {
	// Připojení k mongoDB
	var err error
	client, err = mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}

	// Odkaz na kolekci products v databázi shop
	collection = client.Database("shop").Collection("products")

	r := gin.Default() // Vytvoříme Gin router s defaultní konfigurací

	// Gin automaticky vytvoří novou instanci gin.Context pro každý request
	// Context obsahuje všechny informace o requestu a umožňuje nám vytvářet odpovědi
	// Tuto instanci pak předá jako arguemnt do handleru - anonymní funkce
	r.GET("/", func(c *gin.Context) { // Definujeme GET endpoint
		c.JSON(http.StatusOK, gin.H{"message": "Hello, World!"}) // Vrátíme JSON odpověď
	})

	r.GET("/products", func(c *gin.Context) {
		cursor, err := collection.Find(context.Background(), bson.D{})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		var products []Product
		err = cursor.All(context.Background(), &products)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, products)
	})

	// Endpoint pro přidání produktu
	r.POST("/products", func(c *gin.Context) {
		var product Product
		// Pokud je v requestu validní JSON a odpovídá struktuře Product, 
		// Gin automaticky přemapuje data z JSON do našich polí (Name, Description, atd.).
		if err := c.ShouldBindJSON(&product); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Vloží produkt do MongoDB
		result, err := collection.InsertOne(context.Background(), product)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"result": result.InsertedID})
	})

	r.Run(":8080") // Spustíme server na portu 8080
}
