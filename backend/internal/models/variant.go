package models

type Variant struct {
	Size  string  `json:"size" bson:"size"`
	Price float64 `json:"price" bson:"price"`
	Stock int     `json:"stock" bson:"stock"`
}
