async function loadAnimals(){
	// Assim que a pagina carregar espere e pegue
	// Funções assincronas iniciam com async e tem await
	const response = await axios.get('http://127.0.0.1:8000/animals')
	
	const animals = response.data
	// console.log(animals)

	const lista = document.getElementById('div-list-animals');
	
	lista.innerHTML = '';


	animals.forEach(animals =>{
		const card = `
						<div class="col s6 m4">
						<div class="card small">
							
							<div class="card-content">
								<div class="container">
									<ul>
										<li><h4 class="flow-text">${animals.name}</h4></li>
										<li><h5 class="flow-text">Idade = ${animals.years}</h5></li>
										<li><h5 class="flow-text">Sex = ${animals.sex}</h5></li>
										<li><h5 class="flow-text">Color = ${animals.color}</h5></li>
										
									</ul>
									
								</div>
								<button class="btn waves-effect waves-light" type="submit" name="action" onclick=update("${animals.id}")>Alterar
								</button>

								<button class="btn waves-effect waves-light" type="submit" name="action" onclick=del("${animals.id}")>Deletar
								</button>
							</div>
							
						</div>
					</div>`

		const item = document.createElement('li');
		item.innerHTML = card;

		lista.appendChild(item);


		console.log('ok')
	});
};

function variveis(){
	const form_animal = document.getElementById('form-animal'),
			input_name = document.getElementById('name'),
			input_age = document.getElementById('age'),
			input_gender = document.querySelector('input[name="gender"]:checked'),
			input_color = document.getElementById('color')


	return [form_animal, input_name, input_age, input_gender, input_color]
}
const [form_animal, input_name, input_age, input_gender, input_color] = variveis()


function varGender(value){
	const cbm = document.getElementById('genderM')
	const cbf = document.getElementById('genderF')
	if (value != 'M' || value != 'F'){
		alert(`ERRO`)
		
	}
	if(value == 'M'){
		cbm.checked = true
		const gender = 'M'
		return gender
		
	}
	else {
		cbf.checked = true
		const gender = 'F'
		return gender
	}
}
function formBackEnd(){
	
	form_animal.onsubmit = async(event) =>{
		event.preventDefault()
		
		const name_animal = input_name.value
		const age_animal = parseInt(input_age.value)
		
		const color_animal = input_color.value
		
		await axios.post('http://127.0.0.1:8000/animals/', {
			name: name_animal,
			years: age_animal,
			sex: 'F',
			color: color_animal
		})
		
		alert(`${name_animal} cadastrado!`)
		loadAnimals()
	}

}
console.log(form_animal, input_name, input_age, input_gender, input_color)
async function update(id_animals){
	const res = await axios.get(`http://127.0.0.1:8000/animals/${id_animals}`,)
	const animal = res.data
	
	const atual_name = input_name.value = animal.name
	const atual_age = input_age.value = animal.years
	const atual_color = input_color.value = animal.color
	const atual_gender = varGender(animal.sex)
	
	
	
	console.log('Upadte')
	
	form_animal.onsubmit = async(event) =>{
		const sel = document.querySelector('input[name="gender"]:checked')
		console.log(sel.value)
		event.preventDefault()
		console.log(input_name.value)

		const employee = {
			id: id_animals,
			name: input_name.value,
			years: parseInt(input_age.value),
			sex: sel.value,
			color: input_color.value
		}
		console.log(employee)
		await axios.put(`http://127.0.0.1:8000/animals/${id_animals}`, employee)
		btn_reset.click()
		console.log(employee)
		loadAnimals()
	}		
}
async function del(id_animals){
	await axios.delete(`http://127.0.0.1:8000/animals/${id_animals}`,)
	window.location.reload()
}

function app(){
	console.log("APP INICIADA");
	loadAnimals()
	formBackEnd()
}!

app();