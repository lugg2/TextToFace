#include <SFML/Graphics.hpp>
#include <Image.hpp>

int main()
{
// Create a 20x20 image filled with black color
sf::Image image;
image.create(20, 20, sf::Color::Black);

// Copy image1 on image2 at position (10, 10)
//image.copy(background, 10, 10);

// Save the image to a file
if (!image.saveToFile("result.png"))
    return -1;

}
