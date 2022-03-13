import axios from 'axios';

const getToken = async () => {
	return await axios.get("http://103.144.20.107/svc_webapi/svc.aspx?jenis=getkodepass").then(res => res.data);
}

const getAllListMerchItem = async () => {
	const token = await getToken();

	return await axios.get(`http://103.144.20.107/svc_webapi/svc.aspx?jenis=getallitem&kodepass=${token.hasil}`).then(res => res.data);
}

const getItemByPLU = async (PLU) => {
	const token = await getToken();

	return await axios.get(`http://103.144.20.107/svc_webapi/svc.aspx?jenis=getdataitem&plu=${PLU}&kodepass=${token.hasil}`).then(res => res.data);
}

const getAllBPcs = async () => {
	const token = await getToken();

	return await axios.get(`http://103.144.20.107/svc_webapi/svc.aspx?jenis=getallbpcs&kodepass=${token.hasil}`).then(res => res.data);
}

const getItemByBPcs = async (bpcs) => {
	const token = await getToken();

	return await axios.get(`http://103.144.20.107/svc_webapi/svc.aspx?jenis=getdatabpcs&bpcs=${bpcs}&kodepass=${token.hasil}`).then(res => res.data);
}

const getBpcsByFilter = async (date) => {
	const token = await getToken();

	return await axios.get(`http://103.144.20.107/svc_webapi/svc.aspx?enis=getallbpcs&kodepass=${token.hasil}&tahun=${date.tahun}&bulan=${date.bulan}&tgl=${data.tanggal}`).then(res => res.data);
}

export default {
	getToken,
	getAllListMerchItem,
	getItemByPLU
};