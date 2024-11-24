package database

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"real-time-forum/models"

	_ "modernc.org/sqlite"
)

var (
	Database *sql.DB
	err      error
)

func OpenDB() *sql.DB {
	Database, err = sql.Open("sqlite", "./database/forum.db")
	if err != nil {
		log.Fatal(err)
	}
	return Database
}

func CreateTables() {
	Database, err = sql.Open("sqlite", "./database/forum.db")
	if err != nil {
		log.Fatal(err)
	}
	defer Database.Close()

	fmt.Println("Database created successfully")

	// Read the queries from schema.sql
	schemaSQL, err := ioutil.ReadFile("./database/schema.sql")
	if err != nil {
		log.Fatal(err)
	}

	_, err = Database.Exec(string(schemaSQL))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Schema created successfully")

	// Sample data initialization
	var (
		users = []models.User{
			{Name: "jehad", Username: "jehada1", Email: "jehadalami11@gmail.com", Password: "$2a$10$PImP96Yugx0JLBKX7jtNuOWZNBM5Tza7/NaiOrx6S9XrkDj/032G.", Age: 22, Gender: "M", FirstName: "jehad", LastName: "alami"},
			{Name: "noor", Username: "noora1", Email: "noor1@gmail.com", Password: "$2a$10$9Tlj6GnZETsMKjwL1teBg.kXXv6hA6frc3vzKXvqbUKXvFBptX4fu", Age: 20, Gender: "M", FirstName: "noor", LastName: "al1"},
		}
		categories = []models.Category{
			{Libelle: "Health", Icon: "&#128657;"},
			{Libelle: "Sciences", Icon: "&#128300;"},
			// Add other categories...
		}
		posts = []models.Post{
			{
				Title:     "Two new targets to support LeBron James at the Lakers",
				Content:   "After a series of excellent signings at the start of NBA Free Agency...",
				ImagePath: "",
				VideoPath: "",
				UserId:    2,
			},
		}
	)

	if InitUser(users) {
		fmt.Println("Users created successfully")
	} else {
		fmt.Println("Failed to create users")
	}

	if InitCategorie(categories) {
		fmt.Println("Categories created successfully")
	} else {
		fmt.Println("Failed to create categories")
	}

	if InitPosts(posts) {
		fmt.Println("Posts created successfully")
	} else {
		fmt.Println("Failed to create posts")
	}
}

func InitUser(users []models.User) bool {
	ok := true
	for _, user := range users {
		_, err := models.Register(Database, user)
		if err != nil {
			ok = false
		}
	}
	return ok
}

func InitCategorie(categories []models.Category) bool {
	ok := true
	for _, category := range categories {
		_, err := models.CreateCategory(Database, category)
		if err != nil {
			ok = false
		}
	}
	return ok
}

func InitPosts(posts []models.Post) bool {
	ok := true
	for _, post := range posts {
		_, err := models.CreatePost(Database, post, nil)
		if err != nil {
			ok = false
		}
	}
	return ok
}
