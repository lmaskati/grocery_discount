import requests
from bs4 import BeautifulSoup

class Store:
	def __init__(self, name, url, prod):
		self.name = name
		self.url = url
		self.prod = prod
		self.clean_products()
		self.discounts = []

	def run_discounts(self):
		new_url = self.url + self.prod
		self.find_discounts(new_url)
		return self.discounts 

	def find_discounts(self, updated_url):
		if self.name == "cold storage":
			# print("Cold Storage:")
			# print(" ")
			self.cold_storage_find(updated_url)
		elif self.name == "ntuc":
			print("NTUC:")
			print(" ")
			self.ntuc_find(updated_url)


	def cold_storage_find(self, updated_url):
		
		page = requests.get(updated_url)
		parsed_html = BeautifulSoup(page.content, "html.parser")
		list_of_products = parsed_html.find_all("div", class_="product_box")
		final_list_of_products = []


		for product in list_of_products[:1]:
			name = product.find('div', class_="product_name").text
			discount = product.find('div', class_="price_promo")
			img_link = product.find('img', class_="img-fluid")["src"]
			
			if discount:
				discount_text = discount.text
			else:
				continue

			price = product.find('div', class_="price_now").text

			item = {
				"name": name.strip(),
				"src": img_link.strip(),
				"discount": discount_text.strip(),
				"cur_price": price.strip(),
				"category":self.prod.replace("%20", " ")}
			# print(item)
			self.discounts.append(item)
		
			# link = "Link to product: https://coldstorage.com.sg" + product.find('a').get('href')
			# print(link.strip())
		

	def ntuc_find(self, updated_url):
		headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
		page = requests.get(updated_url, headers=headers)
		parsed_html = BeautifulSoup(page.content, "html.parser")
		list_of_products = parsed_html.find_all("div", class_="sc-1plwklf-1 kXzSdT")
		for product in list_of_products:
			is_discount = product.find('span', class_="sc-1bsd7ul-1 sc-1plwklf-18 FDtEN hNLPXj")
			if is_discount:
				item_name = product.find('span', class_="sc-1bsd7ul-1 gGWxuk").text
				print("Product name: " + item_name)
				old_price = product.find('span', class_="sc-1bsd7ul-1 sc-1svix5t-1 gJhHzP koizQX").text
				
				new_price = product.find('span', class_="sc-1bsd7ul-1 sc-1svix5t-0 gGWxuk esJgnK")
				if new_price:
					print("Original price: " + new_price.text)
					print("Discounted price: " + old_price)
				else:
					print("Original price: " + old_price)


				other_discount = product.find('div', class_="sc-1plwklf-16 hRbyxZ")
				if other_discount:
					print("Discount: " + other_discount.text)


	def clean_products(self):
		self.prod = self.prod.replace(" ", "%20")


ntuc_items = [] 

def get_cold_storage(item):
	#, "waitrose spinach and goat cheese pizza", "waitrose madagascar vanilla ice cream", "waitrose cannellini beans", "waitrose chickpeas in water", "waitrose essential balsamic vinegar", "ozganics indian tikka masala c/sauce", "ozganics sweet chilli sauce", "ozganics creamy avocado dressing"
	cold_storage = Store("cold storage", "https://coldstorage.com.sg/search?q=", item)
	res = cold_storage.run_discounts()
	return res


def check(): 
	return [{"name":"orange","discount":4,"old_price":3}]


# ntuc = Store("ntuc", "https://www.fairprice.com.sg/search?query=", ntuc_items)
# ntuc.run_discounts()



# NOTE: NTUC DETECTS ROBOT VS USER - NEED TO USE HEADERS TO GET AROUND THIS 

