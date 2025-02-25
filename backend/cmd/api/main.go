package main

import (
	"log"

	"github.com/BojkoJ/go-react-project/backend/internal/api/routes"
	"github.com/BojkoJ/go-react-project/backend/internal/database"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database connection
	if err := database.Connect(); err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer database.Disconnect()

	// Initialize Gin router
	r := gin.Default()

	// Setup routes
	routes.SetupRoutes(r)

	// Start the server
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
