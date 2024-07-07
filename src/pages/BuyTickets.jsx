import React, { useState, useEffect, useContext } from "react";
import NavBar from "../components/ToolsC/NavBar";
import DynamicLayout from "../components/ToolsC/DynamicLayout";
import { useParams } from "react-router-dom";
import { findEvent } from "../services/events.service";
import { TicketsContext } from "../context/tickets.context";
import {
  createTransaction,
  findAllTransactions,
} from "../services/transaction.service";
import CryptoJS from "crypto-js";

const BuyTickets = () => {
  const param = useParams();
  console.log("eventIdParam:", param.eventIdParam);
  const [selected, setSelected] = useState({
    id: "",
    price: 0,
    hasTables: false,
    maxTickets: 1,
    name: "",
    tixToGenerate: 0,
    blockId: "",
  });
  const [event, setEvent] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);
  const { ticketsCart, setTicketsCart } = useContext(TicketsContext);
  const [checkoutTab, setCheckoutTab] = useState(false);
  const [total, setTotal] = useState(0);
  const [cargoServicio, setCargoServicio] = useState(0);
  const [transactionLength, setTransactionLength] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [email, setEmail] = useState(null);

  const handleCheckoutTab = () => {
    setCheckoutTab((prev) => !prev);
  };

  function formatNumberWithCommas(value) {
    const number = parseFloat(value);
    if (isNaN(number)) {
      return value;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const calculateTotal = (ticketsCart) => {
    const newTotal = ticketsCart.reduce(
      (total, ticket) => total + ticket.price,
      0
    );
    setTotal(newTotal);
  };

  useEffect(() => {
    calculateTotal(ticketsCart);
    setCargoServicio(total * 0.1);
  }, [ticketsCart, cargoServicio]);

  console.log("🚀 ~ BuyTickets ~ total:", total);
  console.log("🚀 ~ BuyTickets ~ cargoServicio:", cargoServicio);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 760);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
      console.log("GetTheEvent - Success:", response);
      if (response.success) {
        setEvent(response.event);
      }
    } catch (error) {
      console.error("GetTheEvent - Error:", error.response);
    }
  };

  const getAllTransaction = async () => {
    try {
      const response = await findAllTransactions();
      if (response.success) {
        setTransactionLength(response.transactions.length);
      }
      console.log("GetTheTransactions - Sucess:", response);
    } catch (error) {
      console.error("GetTheTransactions - Error:", error.response);
    }
  };

  console.log("Transactions:", transactionLength);

  useEffect(() => {
    getEvent();
    getAllTransaction();
  }, []);

  const handleAddToCart = () => {
    console.log("Adding to cart:", selected);
    setTicketsCart((prevTicketsCart) => [...prevTicketsCart, selected]);
    setSelected({ id: "", price: 0 });
  };

  const handleRemoveFromCart = (id) => {
    setTicketsCart((prevTicketsCart) => {
      const updatedCart = prevTicketsCart.filter((ticket) => ticket.id !== id);
      return updatedCart;
    });
  };

  const calculateAuthHash = () => {
    const secretKey =
      "asdhakjshdkjasdasmndajksdkjaskldga8odya9d8yoasyd98asdyaisdhoaisyd0a8sydoashd8oasydoiahdpiashd09ayusidhaos8dy0a8dya08syd0a8ssdsax";
    const fields = [
      "39038540035",
      "Prueba AZUL",
      "ECommerce",
      "$",
      "001",
      (total + cargoServicio).toFixed(2).replace(".", ""),
      "000",
      `https://localhost:5173/approved/${param.eventIdParam}/${transactionId}`,
      "https://google.com",
      "https://google.com",
      "1",
      "ticketsAmount",
      ticketsCart.length.toString(),
      "0",
      "",
      "",
      secretKey,
    ];
    const hashString = fields.join("");
    const hash = CryptoJS.HmacSHA512(hashString, secretKey);
    return hash.toString(CryptoJS.enc.Hex);
  };

  // transactionNumber: { type: Number },
  // paymentMethod: { type: String },
  // subTotal: { type: Number, default: 0 },
  // discount: { type: Number, default: 0 },
  // tax: { type: Number, default: 0 },
  // total: { type: Number, default: 0 },
  // description: { type: String, default: "" },
  // status: { type: String, enum: ["pending", "completed", "canceled"] },
  // items: [
  //   {
  //     name: { type: String, required: true },
  //     quantity: { type: Number, required: true },
  //     price: { type: Number, required: true },
  //   },
  // ],
  // buyer: { type: Schema.Types.ObjectId, ref: "Users" },

  const transactionBody = {
    transactionNumber: transactionLength,
    paymentMethod: "",
    subTotal: "",
    discount: "",
    tax: "",
    total: "",
    description: "",
    status: "pending",
    items: ticketsCart,
    email: email,
  };

  const [emailPrompt, setEmailPrompt] = useState(null);

  const handleTransaction = async () => {
    if (!email) {
      setEmailPrompt("Email must be filled");
      setTimeout(() => {
        setEmailPrompt(null);
      }, 3000);
    } else {
      try {
        const response = await createTransaction(transactionBody);
        if (response.success) {
          setTransactionId(response.transaction._id);
          console.log("CreateTransaction - Success:", response);
          setCheckoutTab(true);
        }
      } catch (error) {
        console.error("CreateTransaction - Success:", error.response);
      }
    }
  };

  console.log("transactionId:", transactionId);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail((prevEmail) => value);
  };

  return (
    <div>
      <NavBar />
      <div className={checkoutTab ? "checkout-tab" : ""}>
        <h1 className="buy-tickets-title">👇🏻 Select Where You Want To Go 👇🏻</h1>
        <div className="buy-tickets-container">
          <DynamicLayout
            layoutId={event?.layout?._id}
            scale={isMobile ? 0.5 : 0.8}
            edit={false}
            tooltip={true}
            formatPrices={true}
            addToCart={true}
            selected={selected}
            setSelected={setSelected}
          />
          <div className="cart-container">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="buy-tickets-cart"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                fill="currentColor"
              />
              <path
                d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                fill="currentColor"
              />
              <path
                d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                fill="currentColor"
              />
            </svg>
            {ticketsCart.length > 0 && (
              <h1 className="cart-count">{ticketsCart.length}</h1>
            )}
            {selected?.id &&
              !ticketsCart.some((ticket) => ticket.id === selected.id) && (
                <button onClick={handleAddToCart} className="click-inside">
                  Add To Cart
                </button>
              )}
          </div>
        </div>

        {ticketsCart.length > 0 && (
          <div className="email-container-buytickets">
            {emailPrompt && <h2 className="email-prompt">{emailPrompt}</h2>}
            <label htmlFor="email" className="email-title-tickets">
              ¿Donde enviamos los tickets?
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              name="email"
              onChange={handleInputChange}
              className="email-transaction-input"
            />
          </div>
        )}
        {ticketsCart.length > 0 && (
          <div>
            <div className="buy-tickets-form">
              {ticketsCart.map((ticket, index) => (
                <div
                  key={index}
                  className="tickets-selected-container ticket-selected-bg"
                >
                  <h1>Selected:</h1>
                  <h1 className="cart-btns">
                    <button
                      onClick={() => handleRemoveFromCart(ticket.id)}
                      className="remove-from-cart"
                    >
                      -
                    </button>
                    ${formatNumberWithCommas(ticket.price)}
                    {!ticket.hasTables && (
                      <button className="add-from-cart">+</button>
                    )}
                  </h1>
                </div>
              ))}
              <div className="tickets-selected-container ticket-selected-cargo">
                <h1>Cargo x Servicio:</h1>
                <h1>${formatNumberWithCommas(total * 0.1)}</h1>
              </div>
              <div className="tickets-selected-container ticket-selected-total">
                <h1>Total:</h1>
                <h1 className="bold">
                  RD$ {formatNumberWithCommas(total + cargoServicio)}
                </h1>
              </div>
            </div>

            <div className="checkout-cancel-container">
              <button className="checkout-btn" onClick={handleTransaction}>
                Check-Out
              </button>
              <h1 className="checkout-cancel">Cancel</h1>
            </div>
          </div>
        )}
      </div>
      <div className={checkoutTab ? "checkout-tab-page" : "checkout-tab"}>
        {/* <h1 className="payment-method">Payment Method</h1> */}
        <div className="privacy-policy">
          <h1 className="payment-method margin-top">Política de Privacidad</h1>
          <p>
            En Spotmeup, nos comprometemos a proteger su privacidad y garantizar
            que su información personal esté segura. Esta Política de Privacidad
            describe cómo recopilamos, usamos, compartimos y protegemos su
            información personal cuando utiliza nuestros servicios para comprar
            tickets y diseñar layouts para eventos.
          </p>
          <p>
            información personal como su nombre, dirección de correo
            electrónico, número de teléfono, y dirección física cuando se
            registra en Spotmeup. Además, recopilamos información de su cuenta,
            incluyendo fotos de perfil, preferencias de usuario y su historial
            de compras. Los promotores que utilizan nuestros servicios pueden
            crear y almacenar diseños de layouts para sus eventos, así como
            descripciones e imágenes relacionadas con los mismos. Cuando realiza
            una compra, utilizamos Azul como nuestra plataforma de pago segura
            para procesar sus transacciones.
          </p>
          <p>
            Uso de la Información Utilizamos su información personal para
            procesar sus compras de tickets, gestionar su cuenta de usuario y
            mejorar su experiencia en nuestra plataforma. La información
            proporcionada por los promotores sobre los eventos se utiliza para
            facilitar la organización y promoción de los mismos. También podemos
            utilizar su información de contacto para enviarle notificaciones
            importantes relacionadas con sus compras, actualizaciones de eventos
            y otras comunicaciones relevantes. Spotmeup no comparte su
            información personal con terceros, excepto cuando sea necesario para
            procesar pagos a través de Azul o cumplir con requisitos legales.
          </p>
          <p>
            Seguridad de la Información En Spotmeup, implementamos medidas de
            seguridad robustas para proteger su información personal contra el
            acceso no autorizado, la alteración, divulgación o destrucción.
            Utilizamos tecnología de cifrado y otras prácticas de seguridad para
            garantizar que su información esté segura mientras está en tránsito
            y almacenada en nuestros servidores. Sin embargo, le recomendamos
            que tome precauciones adicionales para proteger su información
            personal, como mantener su contraseña segura y no compartirla con
            otros.
          </p>
          <p>
            Derechos del Usuario Usted tiene el derecho de acceder, rectificar o
            eliminar su información personal en cualquier momento. Si desea
            ejercer alguno de estos derechos, puede ponerse en contacto con
            nuestro equipo de soporte a través de los medios proporcionados en
            nuestro sitio web. Nos comprometemos a responder a sus solicitudes
            de manera oportuna y a proporcionarle la asistencia necesaria para
            gestionar su información personal.
          </p>
          <p>
            Cambios en la Política de Privacidad Nos reservamos el derecho de
            actualizar esta Política de Privacidad en cualquier momento.
            Cualquier cambio significativo en la manera en que manejamos su
            información personal será notificado a través de nuestro sitio web o
            mediante un correo electrónico. Le recomendamos que revise
            periódicamente esta política para estar informado sobre cómo
            protegemos su información.
          </p>
          <p>
            Contacto Si tiene alguna pregunta o inquietud sobre nuestra Política
            de Privacidad, no dude en ponerse en contacto con nosotros a través
            de soporte@spotmeup.net
          </p>
        </div>
        <div className="privacy-policy">
          <h1 className="payment-method margin-top">Política de Seguridad</h1>
          <p>
            Tomamos todas las medidas y precauciones razonables para proteger tu
            información personal y seguimos las mejores prácticas de la
            industria para asegurar que tu información no sea utilizada de
            manera inapropiada, alterada o destruida. Ciframos la información de
            tu tarjeta de crédito utilizando la tecnología de capa de puertos
            seguros o Secur Sockets Layer (SSL), y la almacenamos con el cifrado
            AES-256. También, seguimos todos los requerimientos del PCI-DSS.
          </p>
          <p>
            Los métodos de pago utilizados por LA EMPRESA son servicios de
            terceros. Estos servicios de terceros (AZUL), cumplen con todos los
            estándares de seguridad y cifrado para mantener tu información
            segura. Solo utilizarán la información necesaria para completar el
            proceso requerido. También recomendamos leer las Políticas de
            Privacidad de estos proveedores, para entender mejor cómo manejan la
            información suministrada.
          </p>
        </div>
        <div className="card-details">
          <form
            action="https://pruebas.azul.com.do/PaymentPage/"
            method="post"
            id="paymentForm"
            name="paymentForm"
            target="_blank"
          >
            <input
              type="hidden"
              id="MerchantId"
              name="MerchantId"
              value="39038540035"
            />
            <input type="hidden" id="TrxType" name="TrxType" value="Sale" />
            <input
              type="hidden"
              id="MerchantName"
              name="MerchantName"
              value="Prueba AZUL"
            />
            <input
              type="hidden"
              id="MerchantType"
              name="MerchantType"
              value="ECommerce"
            />
            <input
              type="hidden"
              id="CurrencyCode"
              name="CurrencyCode"
              value="$"
            />
            <input
              type="hidden"
              id="OrderNumber"
              name="OrderNumber"
              value="001"
            />
            <input
              type="hidden"
              id="Amount"
              name="Amount"
              value={Math.round((total + cargoServicio) * 100)}
            />
            <input type="hidden" id="ITBIS" name="ITBIS" value="000" />
            <input
              type="hidden"
              id="ApprovedUrl"
              name="ApprovedUrl"
              value={`https://localhost:5173/approved/${param.eventIdParam}/${transactionId}`}
            />
            <input
              type="hidden"
              id="DeclinedUrl"
              name="DeclinedUrl"
              value="https://google.com"
            />
            <input
              type="hidden"
              id="CancelUrl"
              name="CancelUrl"
              value="https://google.com"
            />
            <input
              type="hidden"
              id="UseCustomField1"
              name="UseCustomField1"
              value="1"
            />
            <input
              type="hidden"
              id="CustomField1Label"
              name="CustomField1Label"
              value="ticketsAmount"
            />
            <input
              type="hidden"
              id="CustomField1Value"
              name="CustomField1Value"
              value={ticketsCart.length.toString()}
            />
            <input
              type="hidden"
              id="UseCustomField2"
              name="UseCustomField2"
              value="0"
            />
            <input
              type="hidden"
              id="CustomField2Label"
              name="CustomField2Label"
              value=""
            />
            <input
              type="hidden"
              id="CustomField2Value"
              name="CustomField2Value"
              value=""
            />

            <input
              type="hidden"
              id="AuthHash"
              name="AuthHash"
              value={calculateAuthHash()}
            />
            <input
              type="submit"
              name="submit"
              value="Acepto"
              className="checkout-btn"
              style={{ fontSize: "20px" }}
            />
          </form>
        </div>
        

        
        <h1 className="checkout-cancel" onClick={() => setCheckoutTab(false)}>
          Cancel
        </h1>
      </div>
    </div>
  );
};

export default BuyTickets;
