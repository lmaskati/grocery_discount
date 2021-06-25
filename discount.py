import requests
from bs4 import BeautifulSoup

class Store:
	def __init__(self, name, url, products):
		self.name = name
		self.url = url
		self.products = products
		self.clean_products()

	def run_discounts(self):
		for prod in self.products:
			new_url = self.url + prod
			print("\n***")
			print("ITEM: " + prod.replace("%20", " "))
			self.find_discounts(new_url)

	def find_discounts(self, updated_url):
		if self.name == "cold storage":
			print("Cold Storage:")
			print(" ")
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

		for product in list_of_products:
			name = product.find('div', class_="product_name").text
			discount = product.find('div', class_="price_promo")
			if discount:
				discount_text = discount.text
			else:
				continue

			print("----")
			print("Product name: " + name.strip())
			print("Current discount: " + discount_text.strip())
			price = product.find('div', class_="price_now").text
			print("Current price: " + price.strip())
			link = "Link to product: https://coldstorage.com.sg" + product.find('a').get('href')
			print(link.strip())


	def ntuc_find(self, updated_url):
		headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
		page = requests.get(updated_url, headers=headers)
		parsed_html = BeautifulSoup(page.content, "html.parser")
		list_of_products = parsed_html.find_all("div", class_="sc-1plwklf-1 kXzSdT")
		for product in list_of_products:
			is_discount = product.find('span', class_="sc-1bsd7ul-1 sc-1plwklf-18 FDtEN hNLPXj")
			if is_discount:
				item_name = product.find('span', class_="sc-1bsd7ul-1 gGWxuk").text
				print("----")
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
		self.products = [x.replace(" ", "%20") for x in self.products]

cold_storage_items = []
ntuc_items = [] 
cold_storage_bool = True
ntuc_bool = True

print("Enter the items you buy from cold storage. Press 'e' when you are done.")
while cold_storage_bool:
	val = input("Enter your item:")
	if val == 'e':
		cold_storage_bool = False
		print("These are your cold storage items:")
		print(cold_storage_items)
	else:
		cold_storage_items.append(val)

print("Enter the items you buy from NTUC. Press 'e' when you are done.")
while ntuc_bool:
	val = input("Enter your item:")
	if val == 'e':
		print("These are your NTUC items:")
		print(ntuc_items)
		ntuc_bool = False
	else:
		ntuc_items.append(val)

cold_storage = Store("cold storage", "https://coldstorage.com.sg/search?q=", cold_storage_items)
cold_storage.run_discounts()

ntuc = Store("ntuc", "https://www.fairprice.com.sg/search?query=", ntuc_items)
ntuc.run_discounts()



# NOTE: NTUC DETECTS ROBOT VS USER - NEED TO USE HEADERS TO GET AROUND THIS 

