import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import API from "../../services/index";

export default function useRequirementsTabData(props) {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();

	const Test = () => {
		console.log("This is from useRequirmentsTabData");
	};

	return {
		store,
		route,
		$q,
		Test,
	};
}
