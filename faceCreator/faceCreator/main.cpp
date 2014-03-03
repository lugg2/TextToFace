#include <iostream>
#include <string>
#include <SFML/Graphics.hpp>


int main(int argc, char* argv[])
{

std::string pathname = argv[1];
pathname += ".png";

// Create a 20x20 image filled with black color
sf::Image image;
image.create(20, 20, sf::Color::Black);

// Copy image1 on image at position (10, 10)
sf::Image image1;
image1.create(10,10, sf::Color::Blue);
image.copy(image1, 10, 10);

// Save the image to a file
if (!image.saveToFile(pathname))
    return -1;

std::cout << "<p><img src=\"http://localhost:8888/show?imgName=" << pathname <<"\" alt=\"Bild\"></p>";

}
