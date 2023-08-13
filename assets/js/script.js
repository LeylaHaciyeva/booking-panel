//fake data
const allStaff = [{
    "id": 2,
    "name": "Maria July",
    "email": "mariajuly@egmail.com",
    "image": "./assets/images/staff2.svg"
}, {
    "id": 34,
    "name": "Alex Rosetta",
    "email": "alexyrosetta@egmail.com",
    "image": "./assets/images/staff1.svg"
}]

const allService = [{
        "id": 1,
        "name": "Oral hygiene",
        "image": "./assets/images/staff1.svg",
        "duration": "1 hour",
        "price": 50.00
    },
    {
        "id": 2,
        "name": "Implants",
        "image": "./assets/images/staff1.svg",
        "duration": "1 hour 30 minutes",
        "price": 120.00
    }
]
const allDate = ["2023-08-10", "2023-08-11", "2023-08-12", "2023-09-21"];
const time = [{
        "start_time": "09:00",
        "end_time": "09:30"
    },
    {
        "start_time": "09:30",
        "end_time": "10:00"
    },
    {
        "start_time": "10:30",
        "end_time": "11:00"
    }
]


let allStaffElements = document.querySelector(".all-staff")
let staffModal = document.querySelector(".staff-modal")
let staffElement;
let nextBtnStaff = document.querySelector(".staff_next")
let nextBtnService = document.querySelector(".service_next")
let prevBtnService = document.querySelector(".service_back")
let nextBtnDate = document.querySelector(".date_next")
let prevBtnDate = document.querySelector(".date_back")
let prevBtnConfirm = document.querySelector(".confirm_back")
let staffWarning = document.querySelector(".staff-warning")
let serviceWarning = document.querySelector(".service-warning")
let dateWarning = document.querySelector(".date-warning")
let serviceModal = document.querySelector(".service-modal")
let allServiceElements = document.querySelector(".all-service")
let serviceElement;
let dateModal = document.querySelector(".date-modal")
let confirmationModal = document.querySelector(".confirmation-modal")



window.addEventListener("load", () => {
    localStorage.clear()
})


//staff modal-----------------------------------------------
allStaff.forEach(staff => {
    allStaffElements.innerHTML += `
    <li class="staff-item item" key=${staff.id}>
    <img class="staff-image" src=${staff.image} alt=${staff.name}>
    <div class="staff-item-text">
        <p class="modal-item-name">${staff.name}</p>
        <span class="staff-email">${staff.email}</span>
    </div>
</li>
    `
    document.querySelectorAll(".staff-item").forEach((staffItem) => {
        staffItem.addEventListener("click", (e) => {
            if (e.target == this)
                return;
            for (let i = 0; i < staffItem.parentElement.children.length; i++) {
                const element = staffItem.parentElement.children[i];
                element.classList.remove("selected")
            }
            staffItem.classList.add("selected")
            staffModal.classList.add("modal-passive")
            staffModal.classList.remove("modal-active")
            serviceModal.classList.remove("modal-passive")
            serviceModal.classList.add("modal-active")
            document.querySelector(".service-li").classList.add("active-link")
            document.querySelector(".staff-li").classList.add("done")
            allStaff.find(s => {
                if (s.id == staffItem.getAttribute("key")) {
                    localStorage.setItem("staff", JSON.stringify(s))
                }
            })

        })

    })
})
nextBtnStaff.addEventListener("click", () => {
    if (localStorage.getItem("staff")) {
        staffModal.classList.add("modal-passive")
        staffModal.classList.remove("modal-active")
        serviceModal.classList.remove("modal-passive")
        serviceModal.classList.add("modal-active")
        document.querySelector(".service-li").classList.add("active-link")
        document.querySelector(".staff-li").classList.add("done")
    } else {
        staffWarning.classList.add("active")
        setTimeout(() => {
            staffWarning.classList.remove("active")
        }, 3000);
    }
})



//service modal---------------------------------------------
allService.forEach(service => {
    allServiceElements.innerHTML += `
    <li class="service-item item" key=${service.id}>
    <div class="service-item-left">
        <img class="service-image" src=${service.image} alt="${service.name}">
        <div class="service-item-text">
            <p class="modal-item-name">${service.name}</p>
            <span class="service-item-time">${service.duration}</span>
        </div>
    </div>
    <div class="price">
        <p>${service.price}$</p>
    </div>
</li>`
    document.querySelectorAll(".service-item").forEach(serviceItem => {
        serviceItem.addEventListener("click", (e) => {
            if (e.target == this)
                return;
            for (let i = 0; i < serviceItem.parentElement.children.length; i++) {
                const element = serviceItem.parentElement.children[i];
                element.classList.remove("selected")
            }
            serviceItem.classList.add("selected")
            serviceModal.classList.add("modal-passive")
            serviceModal.classList.remove("modal-active")
            dateModal.classList.remove("modal-passive")
            dateModal.classList.add("modal-active")
            document.querySelector(".service-li").classList.add("done")
            document.querySelector(".date-li").classList.add("active-link")
            allService.find(s => {
                if (s.id == serviceItem.getAttribute("key")) {
                    localStorage.setItem("service", JSON.stringify(s))
                }
            })
        })
    })
})
prevBtnService.addEventListener("click", () => {
    serviceModal.classList.add("modal-passive")
    serviceModal.classList.remove("modal-active")
    staffModal.classList.remove("modal-passive")
    staffModal.classList.add("modal-active")
    document.querySelector(".service-li").classList.remove("done")
    document.querySelector(".service-li").classList.remove("active-link")
    document.querySelector(".staff-li").classList.remove("done")
    document.querySelector(".date-li").classList.remove("active-link")

})
nextBtnService.addEventListener("click", () => {
    if (localStorage.getItem("service")) {
        serviceModal.classList.add("modal-passive")
        serviceModal.classList.remove("modal-active")
        dateModal.classList.remove("modal-passive")
        dateModal.classList.add("modal-active")
        document.querySelector(".service-li").classList.add("done")
        document.querySelector(".date-li").classList.add("active-link")
    } else {
        serviceWarning.classList.add("active")
        setTimeout(() => {
            serviceWarning.classList.remove("active")
        }, 3000);
    }
})


// calendar datetime modal----------------------------------
let daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons img");
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();
let allDays = daysTag.children
let selectedDate;
let timeSelect = document.querySelector(".time-select")
let selectedDateElement = document.querySelector(".selected-date")

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
    for (let i = 0; i < allDays.length; i++) {
        allDate.forEach(date => {
            let year = date.split("-")[0]; 
            let month = date.split("-")[1];
            let d = date.split("-")[2]; 
            if (Number(month) == (currMonth + 1) && currYear == year && d == allDays[i].innerText) {
                allDays[i].classList = "choosable"
            };
        })
        if (allDays[i].classList.contains("choosable")) {
            allDays[i].addEventListener("click", (e) => {
                for (let i = 0; i < e.target.parentElement.children.length; i++) {
                    e.target.parentElement.children[i].classList.remove("selected-day")
                }
                e.target.classList.add("selected-day");
                selectedDate = e.target.innerText + " " + currentDate.innerText
                selectedDateElement.innerText = selectedDate
                localStorage.setItem("date", selectedDate)
                localStorage.removeItem("time")
                timeSelect.innerHTML = ""
                time.forEach(t => {
                    let timeLi = document.createElement("li")
                    timeLi.innerHTML = `<p>${t.start_time}</p> <p> ${t.end_time}</p>`
                    timeSelect.append(timeLi)
                })
                for (let i = 0; i < document.querySelector(".time-select").children.length; i++) {
                    const element = document.querySelector(".time-select").children[i];
                    element.addEventListener("click", (e) => {
                        if (e.target == this)
                            return;
                        localStorage.setItem("time", element.innerText)
                        for (let i = 0; i < element.parentElement.children.length; i++) {
                            element.parentElement.children[i].classList.remove("selected-time")
                        }
                        element.classList.add("selected-time")
                        confirmationModal.classList.add("modal-active")
                        confirmationModal.classList.remove("modal-passive")
                        dateModal.classList.remove("modal-active")
                        dateModal.classList.add("modal-passive")
                        document.querySelector(".date-li").classList.add("done")
                        document.querySelector(".confirm-li").classList.add("active-link")
                    })

                }

            })
        }
    }

}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", (e) => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();

        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

prevBtnDate.addEventListener("click", () => {
    dateModal.classList.add("modal-passive")
    dateModal.classList.remove("modal-active")
    serviceModal.classList.remove("modal-passive")
    serviceModal.classList.add("modal-active")
    document.querySelector(".date-li").classList.remove("done")
    document.querySelector(".date-li").classList.remove("active-link")
    document.querySelector(".service-li").classList.add("active-link")
    document.querySelector(".service-li").classList.remove("done")

})
nextBtnDate.addEventListener("click", () => {
    if (localStorage.getItem("time")) {
        dateModal.classList.add("modal-passive")
        dateModal.classList.remove("modal-active")
        confirmationModal.classList.remove("modal-passive")
        confirmationModal.classList.add("modal-active")
        document.querySelector(".date-li").classList.add("done")
        document.querySelector(".date-li").classList.add("active-link")
        document.querySelector(".confirm-li").classList.add("active-link")
        document.querySelector(".confirm-li").classList.remove("done")
    } else {
        dateWarning.classList.add("active")
        setTimeout(() => {
            dateWarning.classList.remove("active")
        }, 3000);
    }
})


//confirmation modal
let note = document.querySelector(".note ul")
let confirmationForm = document.querySelector(".confirmation-form")
let formDataObject = {
    staff_id: "",
    service_id: "",
    date: '',
    time: '',
    customer: {
        name: '',
        surname: '',
        email: '',
        phone: ''
    }
}
if (localStorage.getItem("time") !== null) {
    note.innerHTML = `
    <li>
         <span>Staff</span>
         <p>${JSON.parse(localStorage.getItem("staff")).name}</p>
    </li>
    <li>
        <span>Service</span>
        <p>${JSON.parse(localStorage.getItem("service")).name}</p>
    </li>
    <li>
        <span>Date</span>
        <p>${localStorage.getItem("date")} / ${localStorage.getItem("time")}</p>
    </li>
    <li> 
        <span>Price</span>
        <p>$${JSON.parse(localStorage.getItem("service")).price}</p>
    </li>
 `
}
confirmationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formDataObject.service_id = JSON.parse(localStorage.getItem("service")).id
    formDataObject.staff_id = JSON.parse(localStorage.getItem("staff")).id
    formDataObject.time = localStorage.getItem("time")
    formDataObject.date = localStorage.getItem("date")
    formDataObject.customer.name = e.target.name.value
    formDataObject.customer.surname = e.target.surname.value
    formDataObject.customer.email = e.target.email.value
    formDataObject.customer.phone = e.target.phone.value
    if (e.target.name.value !== "" && e.target.email.value !== "" && e.target.surname.value !== "") {
        document.querySelector(".alert-success").style.display = "block"
        console.log(formDataObject);
        e.target.name.value=""
        e.target.surname.value=""
        e.target.phone.value=""
        e.target.email.value=""
    } else {
        document.querySelector(".alert-warning").style.display = "block"
    }
})
prevBtnConfirm.addEventListener("click", () => {
    confirmationModal.classList.add("modal-passive")
    confirmationModal.classList.remove("modal-active")
    dateModal.classList.remove("modal-passive")
    dateModal.classList.add("modal-active")
    document.querySelector(".date-li").classList.remove("done")
    document.querySelector(".date-li").classList.add("active-link")
    document.querySelector(".confirm-li").classList.remove("active-link")
    document.querySelector(".confirm-li").classList.remove("done")
})




//confirm alert 
document.querySelector(".warning-alert-delete").addEventListener("click", () => {
    document.querySelector(".alert-warning").style.display = "none"
})
document.querySelector(".success-alert-delete").addEventListener("click", () => {
    document.querySelector(".alert-success").style.display = "none"
})