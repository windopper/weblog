import { useRouter } from "next/navigation";

export default function useBack() {
    const router = useRouter();

    const handleBack = () => {
      if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
        router.back();
      } else {
        router.push('/');
      }
    };

    return { handleBack };
}