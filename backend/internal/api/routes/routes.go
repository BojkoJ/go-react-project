package routes

import (
	"github.com/BojkoJ/go-react-project/backend/internal/api/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	productHandler := handlers.NewProductHandler()

	// Product routes
	products := r.Group("/products")
	{
		products.GET("", productHandler.GetProducts)
		products.GET("/:id", productHandler.GetProduct)
		products.POST("", productHandler.CreateProduct)
	}
}
