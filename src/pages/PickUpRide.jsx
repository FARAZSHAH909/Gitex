import { useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import { RadioGroup } from "@headlessui/react";
import { User, Users, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

const contacts = [
  "Bal Check Urdu", "Police Helpline", "Fire Brigade", "PTCL Inquiry", 
  "Card Load Eng", "Voice Mail", "Edhi Center", "Bal Check Eng", 
  "Call Center", "Rail Inquiry"
];

export default function RideBooking() {
  const [fare, setFare] = useState("");
  const [modals, setModals] = useState({
    payment: false,
    myselfOptions: false,
    contactList: false,
  });
  const [selected, setSelected] = useState("Myself");

  const toggleModal = (key) => {
    setModals((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      {/* Map Section */}
      <div className="w-full h-[60vh] relative ">
        <MapContainer center={[24.8762, 67.158]} zoom={12} className="w-full h-full rounded-b-2xl z-[1]">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={[[24.8925, 67.2066], [24.8607, 67.0104]]} color="green" />
          <Marker position={[24.8925, 67.2066]} />
          <Marker position={[24.8607, 67.0104]} />
        </MapContainer>
      </div>

      {/* Booking UI */}
      <div className="w-full max-w-md bg-white p-6 rounded-t-2xl shadow-lg -mt-6 border-t z-[99]">
        <h2 className="text-lg font-semibold text-gray-800">Vehicle Type</h2>
        <label className="block text-sm text-gray-500 mt-2">Offer Your Fare</label>
        <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
          <span className="text-gray-400">💲</span>
          <input type="number" value={fare} onChange={(e) => setFare(e.target.value)} placeholder="Enter Fare Amount" className="w-full outline-none pl-2 text-gray-700" />
        </div>
        <p className="text-gray-500 text-sm mt-1">0.0 - 0.0 - Recommended Price</p>

        <div className="flex justify-between mt-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg font-medium" onClick={() => toggleModal("payment")}>💳 Payment</button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg font-medium" onClick={() => toggleModal("myselfOptions")}>🧑 Myself</button>
        </div>
        <button className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-bold mt-5">
           Book Ride
          </button>
      </div>

      {/* Myself Options Modal */}
      {modals.myselfOptions && <MyselfOptions selected={selected} setSelected={setSelected} toggleModal={toggleModal} modals={modals} />}

      {/* Payment Modal */}
      {modals.payment && <PaymentModal toggleModal={toggleModal} />}
    </div>
  );
}

const MyselfOptions = ({ selected, setSelected, toggleModal, modals }) => (
  <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 w-full bg-white p-6 shadow-lg rounded-t-2xl border-t z-[99]">
    {modals.contactList ? (
      <ContactList toggleModal={toggleModal} />
    ) : (
      <div>
        <h3 className="text-lg font-semibold">Someone else taking this ride?</h3>
        <p className="text-sm text-gray-500">Choose a contact to receive driver details & ride OTP.</p>
        <RadioGroup value={selected} onChange={setSelected} className="mt-4 space-y-2">
          <RadioGroup.Option value="Myself">{({ checked }) => (
            <OptionItem checked={checked} label="Myself" Icon={User} />
          )}</RadioGroup.Option>
          <RadioGroup.Option value="Choose Another Contact">{({ checked }) => (
            <OptionItem checked={checked} label="Choose Another Contact" Icon={Users} onClick={() => toggleModal("contactList")} />
          )}</RadioGroup.Option>
          <a href="ChatScreen"><button className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-bold mt-3">
           Massege
          </button>
          </a>
        </RadioGroup>
        <button className="mt-4 w-full py-2 bg-gray-200 rounded-lg" onClick={() => toggleModal("myselfOptions")}>Close</button>
      </div>
    )}
  </motion.div>
);

const OptionItem = ({ checked, label, Icon, onClick }) => (
  <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-gray-300" onClick={onClick}>
    <Icon className="h-5 w-5 text-green-500" />
    <span className="text-sm text-green-500">{label}</span>
    <span className={`ml-auto h-5 w-5 border-2 rounded-full ${checked ? 'border-green-500 bg-green-500' : 'border-gray-300'}`} />
  </div>
);

const ContactList = ({ toggleModal }) => (
  <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="p-4 z-[99]">
    <div className="flex justify-between items-center p-4 border-b">
      <button onClick={() => toggleModal("contactList")}><ChevronLeft className="h-6 w-6" /></button>
      <h3 className="text-lg font-semibold">Choose Contact</h3>
      <button className="text-green-500"><Users className="h-6 w-6" /></button>
    </div>
    <ul className="divide-y divide-gray-200">
      {contacts.map((contact, index) => (
        <li key={index} className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100">
          <User className="h-6 w-6 text-gray-500" />
          <span className="text-sm">{contact}</span>
        </li>
      ))}
      
    </ul>
  </motion.div>
);

const PaymentModal = ({ toggleModal }) => (
  <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 w-full bg-white p-6 shadow-lg rounded-t-2xl border-t z-[99]">
    <div className="fixed bottom-0 left-0 w-full bg-white p-6 shadow-lg rounded-t-2xl border-t">
          <h2 className="text-lg font-semibold">Select Payment Method</h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Credit Card" className="w-8 h-8" />
              Credit Card
              <input type="radio" name="payment" className="ml-auto" />
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-8 h-8" />
              PayPal
              <input type="radio" name="payment" className="ml-auto" />
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Pay" className="w-8 h-8" />
              Google Pay
              <input type="radio" name="payment" className="ml-auto" />
            </label>
            <button className="mt-4 w-full py-2 bg-gray-200 rounded-lg" onClick={() => toggleModal("payment")}>Close</button>
          </div>
          </div>
          
  </motion.div>
);
