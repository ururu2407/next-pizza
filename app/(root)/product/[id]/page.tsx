import { Container, GroupVariants, PizzaImage, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage image={product.image} size={40} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi commodi recusandae
            corrupti nesciunt consectetur. Doloremque vel sapiente omnis aliquid dicta culpa eaque
            perspiciatis aspernatur aliquam officia! Eius officiis amet vero?
          </p>

          <GroupVariants
            value="1"
            items={[
              { name: "small", value: "1" },
              { name: "medium", value: "2" },
              { name: "large", value: "3" },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
