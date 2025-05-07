UML:
![image](https://github.com/user-attachments/assets/d8feec49-6c7a-4a32-bd6a-aa1ef2a7e55b)

Além disso, considerando que cada venda deveria estar associada a apenas um pedido,
seria mais adequado adotar um campo pedido_id diretamente em Venda.

Outro ponto relevante é que o Pedido foi inicialmente pensado como uma entidade que relaciona um produto à quantidade correspondente em uma venda específica;
no entanto, no formato atual, não há uma forma direta de identificar o número de unidades vendidas por produto.

Além disso, a entidade Venda não armazena informações sobre o usuário, o que seria o esperado, já que atualmente essa informação está vinculada apenas à entidade Pedido
